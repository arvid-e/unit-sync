import { UnitConverterImpl } from "./services/UnitConverterImpl.js";
import { UnitConversionServiceImpl } from "./services/UnitConversionServiceImpl.js";
import { UnitValidationServiceImpl } from "./services/UnitValidationServiceImpl.js";
import { InMemoryConversionConfigRepository } from "./repositories/InMemoryConversionConfigRepository.js";
import { InMemoryUnitInfoRepository } from "./repositories/InMemoryUnitInfoRepository.js";

const unitInfoRepo = new InMemoryUnitInfoRepository();
const unitConversionConfigRepo = new InMemoryConversionConfigRepository();
const unitConversionService = new UnitConversionServiceImpl(unitConversionConfigRepo);
const unitValidationService = new UnitValidationServiceImpl(unitInfoRepo, unitConversionConfigRepo);

const unitConverter = new UnitConverterImpl(unitConversionService, unitValidationService);


