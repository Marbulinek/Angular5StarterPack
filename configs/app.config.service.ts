import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/**
 * Configuration of the Angular application
 * ----------------------------------------
 * Change variable in the application-environment.json file
 **/
@Injectable()
export class AppConfigService {

    private config: any = [];
    private environment: string;
    public static ANGULAR_CONF_DEF_PATH: string = "./angular_conf/";

    constructor(private http: Http) {
    }

    /**
     * return all config file
     */
    public getConfig() {
        return this.config;
    }

    /**
     * Return specific config key
     * @param key config key with value
     */
    public getSpecificConfig(key: any){
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
    public loadConfigurationFile(){
        try{
            return new Promise((resolve) => {
                this.http.get(AppConfigService.ANGULAR_CONF_DEF_PATH + 'application-environment.json')
                .map(res => res.json())
                .subscribe( 
                    (data) => {
                        this.environment = data.env;
    
                        this.http.get(AppConfigService.ANGULAR_CONF_DEF_PATH + 'config.' + this.environment + '.json')
                        .map(res => res.json())
                        .subscribe( 
                            (data) => {
                                this.config = data;
                                resolve();
                            }
                        );
                    }
                );
            });
        }catch(e){
            console.log("Config initialization failed!");
        }
    }
}