export class DataBuddyUtils {
  protected validatePathAndFilename(path: string, filename: string) {
    if (!this.isValidPath(path) || !this.isValidFilename(filename)) {
      throw new Error('Invalid path or filename')
    }
  }

  protected isValidPath(path: string): boolean {
    if (!/^[a-zA-Z0-9/]*$/.test(path)) {
      throw new Error('Invalid characters in path')
    }

    if (path.startsWith('/')) {
      throw new Error('Path cannot start with a slash')
    }

    if (path.endsWith('/')) {
      throw new Error('Path cannot end with a slash')
    }

    if (path.includes('//')) {
      throw new Error('Path cannot contain consecutive slashes')
    }

    if (path.includes(' ')) {
      throw new Error('Path cannot contain spaces')
    }

    if (path.includes('..')) {
      throw new Error('Path cannot contain consecutive dots')
    }

    return true
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
