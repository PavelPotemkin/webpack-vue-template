export default async function fetchData(): Promise<string> {
  return await new Promise<string>(resolve => resolve('eee'))
}