import API_DATA from '~/assets/api-data.json';

let customUrl: string;

export function isEmulator(): boolean {
  return android.os.Build.MODEL.includes('sdk_gphone');
}

export function getServerUrl(): string {
  if(!!customUrl) {
    return customUrl;
  }
  return isEmulator() ? API_DATA.LOCALHOST : API_DATA.CLOUD;
}

export function setCustomUrl(url: string) {
  customUrl = url;
}