declare interface SearchParams {
    [key: string]: string | string[] | undefined
}

type SearchParamsPromise = Promise<SearchParams>

declare interface PageProps {
    searchParams: SearchParamsPromise
}