export interface Model<T> {
  create(objeto: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(id: string): Promise<T | null>,
  update(id: string, objeto: T): Promise<T | null>,
  delete(id: string): Promise<T | null>,
}
