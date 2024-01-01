import { FieldSpec, FieldType } from "../../model/Model"
import { HttpError } from "../../utils/error.js"
import { convertStringToValidNumber, uuidRegex } from "../../utils/validation.js"

type ValidatedField = string | number | boolean | Date | null

type UnvalidatedField = string | number | boolean | Date

export interface FieldSpecForValidation {
  name: string,
  type: FieldType,
  cannotBeNull: boolean,
  enumValues?: string[]
  
}

export function validateString(str: any): string {
  if (typeof str !== 'string') {
    throw new HttpError(400, `Expected a string, instead received: ${str}`)
  }
  return str
}

function convertReqValueToDate(reqValue: UnvalidatedField): Date {
  if (reqValue instanceof Date) return reqValue
  if (typeof reqValue === 'string' || typeof reqValue === 'number') {
    // compiler is confused by this
    const tryDate: Date = new Date(reqValue)
    // date won't throw with weird strings, so we only return if the date is real
    if (!isNaN(tryDate.getDate())) {
      return tryDate
    }
  }
  throw new Error()
}

function convertReqValueToFieldType(reqValue: UnvalidatedField, fieldSpec: FieldSpecForValidation): ValidatedField {
  switch (fieldSpec.type) {
    case 'string': // intentional fall thru
    case 'boolean':
      // if the type of the reqValue matches the expected type, then we pass reqValue as is
      if (fieldSpec.type === typeof reqValue) return reqValue
      break
    case 'number':
      // if it's a number, we can just return as is
      if (fieldSpec.type === typeof reqValue) return reqValue
      // if it's a string, we need to check if it can be converted into a valid number
      if (typeof reqValue === 'string') {
        const convertedStrNumber: number | null = convertStringToValidNumber(reqValue)
        if (convertedStrNumber !== null) return convertedStrNumber
      }
      break
    case 'timestamp':
      // need to convert, so validation happens during conversion
      return convertReqValueToDate(reqValue)
    case 'UUID':
      if (typeof reqValue === 'string' && uuidRegex.test(reqValue)) return reqValue
      break
    case 'enum':
      if (fieldSpec.enumValues != null && typeof reqValue === 'string' && fieldSpec.enumValues.includes(reqValue)) return reqValue
      break
    case 'email':
      // similar to string, but need to lowercase all emails
      if ('string' === typeof reqValue) return reqValue.toLowerCase()
      break
  }
  // if we make it here, we should throw (outer function will handle details of this error)
  throw new Error()
}

interface ReqParamWrongTypeDetails {
  shouldBe: string,
  valueInReq: any
}

interface ReqParamValidationError {
  paramName: string,
  nullIssue: boolean | null,
  typeIssue: ReqParamWrongTypeDetails | null
}

function createDataValidationError(errors: ReqParamValidationError[]): HttpError {
  // generate string for error all errors
  return new HttpError(
    400,
    `Data validation failed: ${
      errors.map((e) => {
        if (e.nullIssue !== null) {
          return `${e.paramName} field cannot be null valued`
        } else if (e.typeIssue !== null) {
          return `${e.paramName} field is supposed to be of type ${
            e.typeIssue.shouldBe
          } but instead had value ${e.typeIssue.valueInReq}`
        }
      }).join('; ')
    }`
  )
}


export function validateFields(
  reqFields: { [key: string]: UnvalidatedField },
  fieldSpecs: FieldSpecForValidation[]
): { [key: string]: ValidatedField } {
  let validatedFields: { [key: string]: ValidatedField } = {}
  let errors: ReqParamValidationError[] = []
  // validate expected fields
  for (let fieldSpec of fieldSpecs) {
    const fieldName = fieldSpec.name
    // intentionally coercing null and undefined here -- both should be treated the same
    if (reqFields[fieldName] == null) {
      if (fieldSpec.cannotBeNull) {
        errors.push({
          paramName: fieldName,
          nullIssue: true,
          typeIssue: null
        })
      }
    } else {
      // validate non null values
      try {
        validatedFields[fieldName] = convertReqValueToFieldType(reqFields[fieldName], fieldSpec)
      } catch {
        errors.push({
          paramName: fieldName,
          nullIssue: null,
          typeIssue: {
            shouldBe: fieldSpec.type,
            valueInReq: reqFields[fieldName]
          }
        })
      }
    }
  }
  // throw an informative error if fields failed validation
  if (errors.length > 0) {
    throw createDataValidationError(errors)
  }
  return validatedFields
}

export interface QueryParamsFromReq {
  include?: string,
  sort?: string,
}

type SortType = 'asc' | 'desc'

export interface QueryParams {
  include?: string[] | number[],
  sort?: {[key: string]: SortType},
}

type QueryParamFieldNames = 'include' | 'sort'

interface QueryParamValidationError {
  paramName: string,
  value: string,
  acceptedValues?: string[],
  overrideMessage?: string,
}

function createQueryParamValidationError(errors: QueryParamValidationError[]): HttpError {
  // generate string for error all errors
  return new HttpError(
    400,
    `Query param validation failed: ${
      errors.map((e) => {
        return e.overrideMessage === undefined ? `${e.paramName} has value: ${e.value}${
          e.acceptedValues !== undefined
          ? ` but the only accepted values are: ${e.acceptedValues.join(', ')}`
          : ' but this value is not considered valid'
        }` : e.overrideMessage
      }).join('; ')
    }`
  )
}

interface ValidateSingleQueryParamOutput {
  name: QueryParamFieldNames,
  value: any,
  err: QueryParamValidationError | null
}

function handleValidatedQueryParamOutput(
  validationOutput: ValidateSingleQueryParamOutput,
  validatedParams: QueryParams,
  errors: QueryParamValidationError[]
): void {
  if (validationOutput.value !== null) {
    validatedParams[validationOutput.name] = validationOutput.value
  }
  if (validationOutput.err !== null) {
    errors.push(validationOutput.err)
  }
}

function validateIncludeQueryParam(paramValue: string, fieldSpecs: FieldSpec[]): ValidateSingleQueryParamOutput {
  let name: QueryParamFieldNames = 'include'
  let value: any = []
  let err: QueryParamValidationError | null = null
  const includeIds: string[] = paramValue.split(',')
  const idFieldSpec: FieldSpec | undefined = fieldSpecs.find((fs) => fs.name === 'id')
  // no id field means that we can't use include param
  if (idFieldSpec === undefined) {
    err = {
      paramName: name,
      value: paramValue,
      overrideMessage: 'cannot filter on id field'
    }
  } else {
    const idFieldSpecForValidation = {...idFieldSpec, cannotBeNull: true}
    // make sure they are the right type
    for (let includeId of includeIds) {
      try {
        const validatedIncludeId: string | number = convertReqValueToFieldType(includeId, idFieldSpecForValidation) as string | number
        value.push(validatedIncludeId)
      } catch (e) {
        err = {
          paramName: name,
          value: paramValue,
        }
      }
    }
  }
  return {name, value, err}
}

function validatePositiveNumberQueryParam(paramValue: string, name: QueryParamFieldNames): ValidateSingleQueryParamOutput {
  let value: any = null
  let err: QueryParamValidationError | null = null
  const numberFieldSpec: FieldSpecForValidation = {
    name: '',
    type: 'number',
    cannotBeNull: true,
  }
  // make sure they are the right type
  try {
    const numValue = convertReqValueToFieldType(paramValue, numberFieldSpec)
    // ensuring that the value is non-negative
    if (numValue === null || numValue < 0) throw new Error()
    value = numValue
  } catch (e) {
    err = {
      paramName: name,
      value: paramValue,
    }
  }
  return {name, value, err}
}