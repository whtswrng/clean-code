import {config, ExcludedFileExtensions, IncludedFileExtensions} from "../config";
import {FileSystemCrawler} from "./crawlers/file-system-crawler";
import {TypeScriptFileCrawlerFactory} from "./crawlers/type-script-file-crawler-factory";
import {FileExtensionValidator} from "./crawlers/validators/file-extension-validator";
import {FileDeterminer} from "./crawlers/determiners/file-determiner";
import {DirectoryCrawler} from "./crawlers/directory-crawler";
import * as Table from 'cli-table';
import {BasicTableFormatter} from "./crawlers/table-formatters/basic-table-formatter";
import * as colors from "colors/safe";
import {CliTableFactory} from "./crawlers/printers/cli-table-factory";

const crawlingPath = process.argv[2] || config.DEFAULT_PATH;
const includedFileExtensions: IncludedFileExtensions = config.DEFAULT_FILE_INCLUDED_EXTENSIONS;
const excludedFileExtensions: ExcludedFileExtensions = config.DEFAULT_FILE_EXCLUDED_EXTENSIONS;

const tableFormatter = new BasicTableFormatter(colors as any);
const tableFactory = new CliTableFactory(tableFormatter, Table);
const fileCrawlerFactory = new TypeScriptFileCrawlerFactory(tableFactory, tableFormatter);

startJourney();

function startJourney() {
    const fileExtensionValidator = new FileExtensionValidator(includedFileExtensions, excludedFileExtensions);
    const fileSystemCrawler = new FileSystemCrawler(
        crawlingPath, fileCrawlerFactory, fileExtensionValidator, new FileDeterminer(), new DirectoryCrawler()
    );

    fileSystemCrawler.start();
}

