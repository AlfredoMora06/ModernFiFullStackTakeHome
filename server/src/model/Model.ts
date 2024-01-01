export type FieldType = 'string' | 'UUID' | 'number' | 'timestamp' | 'boolean' | 'enum' | 'email'

export interface FieldSpec {
  name: string,
  type: FieldType,
  requiredForCreateRequest: boolean,
  returnFromDbQuery: boolean,
  canBeModifiedByUser: boolean,
  enumValues?: string[]
}

// FROM: src/utils/objectDiffText.ts :: DiffProp
export type FieldSpecForDiff = FieldSpec & {
  // we use this when an ID is stored in the field, and we want to show that this field changed, we override
  // with (for instance) the name of the object that this field references (Bulldozer changed to Bulldozer XL)
  overridePropName?: string,
  // this is used as a custom function for determining whether this field changed during an edit
  oneItemChangedTextFn?: (oldValue: any, newValue: any) => string,
}

export function columnsReturnedFromDbQuery(fieldSpecs: FieldSpec[], tableName?: string): string[] {
  return fieldSpecs
    .filter((fs) => fs.returnFromDbQuery)
    // add in the table name if its ambiguous
    .map((fs) => `${tableName === undefined ? '' : tableName + '.'}${fs.name}`)
}

export function filterForModifiableFields(toFilter: any, fieldSpecs: FieldSpec[]): { [key: string]: any } {
  return fieldSpecs.reduce(
    (modifiableFields: { [key: string]: any }, fs: FieldSpec) => {
      // intentionally grouping null and undefined here
      if (fs.canBeModifiedByUser && toFilter[fs.name] != null) {
        modifiableFields[fs.name] = toFilter[fs.name]
      }
      return modifiableFields
    },
    {}
  )
}
