export class AdminAppConfig {
    private static localPath = 'http://localhost:3000';
    private static hostPath = 'https://cabpool-taxi.herokuapp.com';

    public static getLocalPath(): string {
        return AdminAppConfig.localPath;
    }

    public static getHostPath(): string {
        return AdminAppConfig.hostPath;
    }
}

// ../common/sdk/custom/api
