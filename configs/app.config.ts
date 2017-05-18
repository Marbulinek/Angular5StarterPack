/**
 * Configuration of the Angular application
 * ----------------------------------------
 * Author: lukas.caniga@gmail.com
 **/

export class AppConfig {

    private config: any = [];
    private environment: string;

    constructor() {
        this.loadConfig();
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

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    private loadConfig() : void
    {
        try{
            let environmentPath = require('./application-environment.json');
            this.environment = environmentPath.env;
            this.config = require('./config.' + environmentPath.env + '.json');
        }catch(e){
            console.log("Config initialization failed!");
        }
    }
    
}