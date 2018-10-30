export class Utils {
  static async sleep(ms: number = 2000) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

}
