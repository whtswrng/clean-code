import * as fs from "fs";
import * as recursive from 'recursive-readdir';
import * as _ from 'lodash';
import {FileCrawlerFactory} from "./file-crawler-factory";
import {FileValidator} from "./validators/file-validator";

export class FileSystemCrawler {

    constructor(private path, private fileCrawlerFactory: FileCrawlerFactory, private fileValidator: FileValidator) {

    }

    public async start(): Promise<void> {
        const result = await this.lsStatPromisified(this.path);

        if(result.isDirectory()) {
            return this.parseRecursiveFolder();
        } else if (result.isFile()) {
            return this.parseFile(this.path);
        }
    }

    private lsStatPromisified(path): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.lstat(path, (err, result) => {
                if(err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    }

    private async parseRecursiveFolder(): Promise<void> {
        const files = await this.getAllFilesFromDir();
        await Promise.all(_.map(files, (file) => this.parseFile(file)));
    }

    private getAllFilesFromDir() {
        return new Promise((resolve, reject) => {
            recursive(this.path, (err, files) => {
                if(err){
                    return reject(err);
                }

                return resolve(files);
            });
        });
    }

    private async parseFile(path): Promise<void> {
        if(this.fileValidator.hasCorrectFileExtension(path)) {
            const fileCrawler = this.fileCrawlerFactory.instantiate(path);
            return fileCrawler.start()
        }
    }


}