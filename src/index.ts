import { UnitConverterImpl } from './services/UnitConverterImpl.js';
import { UnitConversionServiceImpl } from './services/UnitConversionServiceImpl.js';
import { UnitValidationServiceImpl } from './services/UnitValidationServiceImpl.js';
import { InMemoryConversionConfigRepository } from './repositories/InMemoryConversionConfigRepository.js';
import { InMemoryUnitInfoRepository } from './repositories/InMemoryUnitInfoRepository.js';
import { ConsoleAppImpl } from './services/ConsoleAppImpl.js';
import { ConsoleIOImpl } from './services/ConsoleIOImpl.js';

const unitInfoRepo = new InMemoryUnitInfoRepository();
const unitConversionConfigRepo = new InMemoryConversionConfigRepository();
const unitConversionService = new UnitConversionServiceImpl(unitConversionConfigRepo);
const unitValidationService = new UnitValidationServiceImpl(unitInfoRepo, unitConversionConfigRepo);

const unitConverter = new UnitConverterImpl(unitConversionService, unitValidationService);

const consoleIO = new ConsoleIOImpl();
const consoleApp = new ConsoleAppImpl(unitConverter, consoleIO);

await consoleApp.run();

process.exit(0);
