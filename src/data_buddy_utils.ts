export class DataBuddyUtils {
  protected validatePathAndFilename(path: string, filename: string) {
    if (!this.isValidPath(path) || !this.isValidFilename(filename)) {
      throw new Error('Invalid path or filename')
    }
  }

  protected isValidPath(path: string): boolean {
    return /^[a-zA-Z0-9_.-]*$/.test(path)
  }

  protected isValidFilename(filename: string): boolean {
    return /^[a-zA-Z0-9_.-]*$/.test(filename)
  }

  protected sanitizeData(data: object): object {
    const sanitizedData = JSON.parse(JSON.stringify(data))
    for (const key in sanitizedData) {
      if (typeof sanitizedData[key] === 'string') {
        sanitizedData[key] = sanitizedData[key].replace(
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          ''
        )
      }
    }
    return sanitizedData
  }
}
