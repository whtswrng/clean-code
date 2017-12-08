import * as _ from 'lodash';
import {IFileCrawlerFactory} from "./file-crawler-factory.interface";
import {IFileExtensionValidator} from "./validators/file-extension-validator.interface";
import {IFileDeterminer} from "./determiners/file-determiner.interface";
import {IDirectoryCrawler} from "./directory-crawler.interface";

export class FileSystemCrawler {

    constructor(private path,
                private fileCrawlerFactory: IFileCrawlerFactory,
                private fileExtensionValidator: IFileExtensionValidator,
                private fileDeterminer: IFileDeterminer,
                private directoryCrawler: IDirectoryCrawler) {

    }

    public async start(): Promise<void> {
        if (await this.fileDeterminer.isDirectory(this.path)) {
            return this.parseRecursiveFolder(this.path);
        } else if (await this.fileDeterminer.isFile(this.path)) {
            return this.parseFile(this.path);
        }
    }

    private async parseRecursiveFolder(path): Promise<void> {
        const files = await this.directoryCrawler.recursive(path);
        await Promise.all(_.map(files, (file) => this.parseFile(file)));
    }

    private async parseFile(path): Promise<void> {
        if (this.fileExtensionValidator.hasCorrectFileExtension(path)) {
            const fileCrawler = this.fileCrawlerFactory.instantiate(path);
            return fileCrawler.start()
        }
    }


}