/**
 * Configuration of the Angular application
 * ----------------------------------------
 * Change variable in the application-environment.json file
 **/

export class AppConfig {

    private config: any = [];
    private environment: string;

    constructor() {
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Returning actual environment
     */
    public isProd(): boolean{
        return (this.environment=='production')?true:false;
    }
    
}