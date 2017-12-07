import {IncludedFileExtensions} from "../../../config";

export class FileValidator {

    constructor(private includedFileExtensions: IncludedFileExtensions) {

    }

    public hasCorrectFileExtension(filePath) {
        let isValid = false;

        this.includedFileExtensions.forEach((item) => {
            const regex = new RegExp(`.+\.${item}$`, 'g');
            const result = regex.exec(filePath);

            if(result) {
                return isValid = true;
            }
        });

        return isValid;
    }

}