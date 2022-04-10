export interface IpInfoResponse {
  currency: {
    code: string,
    name: string,
    plural: string
  },
  location: {
    continent: {
      code: string,
      name: string
    }
    country: {
      code: string,
      name: string
    },
    region: {
      name: string
    },
    city: string,
    postal: string,
    language: {
      code: string,
      name: string,
      native: string
    }
  },
  time_zone: {
    abreviation: string,
    current_time: string
  }
}