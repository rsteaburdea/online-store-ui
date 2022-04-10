export interface Config {
    languageConfig: LanguageConfig;
    ipConfig: IpConfig
}

export interface LanguageConfig {
    defaultLanguage: string;
    availableLanguages: (string)[];
}

export interface IpConfig {
    url: string;
    token: string;
}