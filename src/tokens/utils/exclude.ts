export const exclude = (object: any, prop: string): any => {
  const { [prop]: excluded, ...rest } = object
  return rest
}
