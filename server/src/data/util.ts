import { QueryParams } from "../controllers/req-data-validation"


export function updateFilterForQueryParams(filter: any, queryParams: QueryParams): any {
  const updatedFilter: any = {...filter}
  if (queryParams.include !== undefined) {
    // if id is already present, then we need to update it
    if (updatedFilter.id != null) {
      // if it's an array, we need to combine
      updatedFilter.id = Array.isArray(updatedFilter.id)
        ? [...updatedFilter.id, ...queryParams.include]
        : [updatedFilter.id, ...queryParams.include]
    } else {
      updatedFilter.id = [...queryParams.include]
    }
  }
  return updatedFilter
}

export function updateFilterForTableName(tableName: string, filter: any): any {
  const updatedFilter: any = {...filter}
  for (let filterKey of Object.keys(updatedFilter)) {
    updatedFilter[`${tableName}.${filterKey}`] = updatedFilter[filterKey]
    delete updatedFilter[filterKey]
  }
  return updatedFilter
}