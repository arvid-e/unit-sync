import { beforeEach, describe, expect, it, vi } from "vitest";
import { UnitInfoRepository } from "../src/interfaces/UnitInfoRepository";
import { ConversionConfigRepository } from '../src/interfaces/ConversionConfigRepository';
import { UnitValidationServiceImpl } from "../src/services/UnitValidationServiceImpl";

describe("UnitValidationService", () => {
  let mockUnitInfoRepo: UnitInfoRepository;
  let mockConversionConfigRepo: ConversionConfigRepository;
  let unitValidationServiceImpl: UnitValidationServiceImpl;

  beforeEach(() => {
    mockUnitInfoRepo = {
      getUnitInfo: vi.fn(),
    };

    mockConversionConfigRepo = {
      getConversionConfig: vi.fn(),
    };

    unitValidationServiceImpl = new UnitValidationServiceImpl(mockUnitInfoRepo, mockConversionConfigRepo);
  });

  describe("isValidValue()", () => {
    it("should return false when input is NaN", () => {
      const inputValue = NaN;
      const invalidInput = unitValidationServiceImpl.isValidValue(inputValue);

      expect(invalidInput).toBe(false);
    });

    it("should return false when input is 0", () => {
      const inputValue = 0;
      const invalidInput = unitValidationServiceImpl.isValidValue(inputValue);

      expect(invalidInput).toBe(false);
    });

    it("should return false when input is Infinity", () => {
      const inputValue = Infinity;
      const invalidInput = unitValidationServiceImpl.isValidValue(inputValue);

      expect(invalidInput).toBe(false);
    });

    it("should return true when input is 1", () => {
      const inputValue = 1;
      const validInput = unitValidationServiceImpl.isValidValue(inputValue);

      expect(validInput).toBe(true);
    });
  });

  describe("isValidUnit()", () => {
    beforeEach(() => {
      (mockUnitInfoRepo.getUnitInfo as any).mockImplementation(
        (unit: string) => {
          if (unit === "kilogram") return { unit: "kilogram", dimension: "mass" };
          return undefined;
        }
      );
    });

    it("should return true on valid input", () => {
      const inputUnit = "kilogram";
      const validUnit = unitValidationServiceImpl.isValidUnit(inputUnit);

      expect(validUnit).toBe(true);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });

    it("should return false on invalid input", () => {
      const inputUnit = "invalid";
      const validUnit = unitValidationServiceImpl.isValidUnit(inputUnit);

      expect(validUnit).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });

    it("should return false on empty string input and not call repository", () => {
      const inputUnit = "";
      const validUnit = unitValidationServiceImpl.isValidUnit(inputUnit);

      expect(validUnit).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).not.toHaveBeenCalled();
    });

    it("should return false on null input and not call repository", () => {
      const inputUnit = null as any;
      const validUnit = unitValidationServiceImpl.isValidUnit(inputUnit);

      expect(validUnit).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).not.toHaveBeenCalled();
    });

    it("should return false undefined input and not call repository", () => {
      const inputUnit = undefined as any;
      const validUnit = unitValidationServiceImpl.isValidUnit(inputUnit);

      expect(validUnit).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).not.toHaveBeenCalled();
    });
  });

  describe("unitsHaveSameDimension()", () => {
    beforeEach(() => {
      (mockUnitInfoRepo.getUnitInfo as any).mockImplementation(
        (unit: string) => {
          if (unit === "meter") return { unit: "meter", dimension: "length" };
          if (unit === "yard") return { unit: "yard", dimension: "length" };
          if (unit === "pound") return { unit: "pound", dimension: "mass" };
          return undefined;
        }
      );
    });

    it("should return true on compatible dimensions", () => {
      const firstDimension = "meter";
      const secondDimension = "yard";

      const validDimensions = unitValidationServiceImpl.unitsHaveSameDimension(
        firstDimension,
        secondDimension
      );

      expect(validDimensions).toBe(true);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(2);
    });

    it("should return false on incompatible dimensions", () => {
      const firstDimension = "meter";
      const secondDimension = "pound";

      const validDimensions = unitValidationServiceImpl.unitsHaveSameDimension(
        firstDimension,
        secondDimension
      );

      expect(validDimensions).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(2);
    });
  });

  describe("isConversionPossible()", () => {
    beforeEach(() => {
      (mockUnitInfoRepo.getUnitInfo as any).mockImplementation(
        (unit: string) => {
          if (unit === "mile") return { unit: "mile", dimension: "length" };
          if (unit === "fahrenheit") return { unit: "fahrenheit", dimension: "temperature" };
          if (unit === "celsius") return { unit: "celsius", dimension: "temperature" };
          if (unit === "kilogram") return { unit: "kilogram", dimension: "mass" };
          return undefined;
        }
      );
    });

    it("should return true on positive value for physical dimension", () => {
      const inputValue = 10;
      const unit = "mile";

      const validDimensions = unitValidationServiceImpl.isConversionPossible(
        inputValue,
        unit
      );

      expect(validDimensions).toBe(true);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });

    it("should return true on positive temperature", () => {
      const inputValue = 500;
      const unit = "fahrenheit";

      const validDimensions = unitValidationServiceImpl.isConversionPossible(
        inputValue,
        unit
      );

      expect(validDimensions).toBe(true);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });

    it("should return true on valid negative temperature", () => {
      const inputValue = -300;
      const unit = "fahrenheit";

      const validDimensions = unitValidationServiceImpl.isConversionPossible(
        inputValue,
        unit
      );

      expect(validDimensions).toBe(true);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });

    it("should return false on invalid negative temperature", () => {
      const inputValue = -300;
      const unit = "celsius";

      const validDimensions = unitValidationServiceImpl.isConversionPossible(
        inputValue,
        unit
      );

      expect(validDimensions).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });

    it("should return false on negative physical dimension", () => {
      const inputValue = -1;
      const unit = "kilogram";

      const validDimensions = unitValidationServiceImpl.isConversionPossible(
        inputValue,
        unit
      );

      expect(validDimensions).toBe(false);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(1);
    });
  });

  describe("unitsAreConfigured()", () => {
    beforeEach(() => {
      (mockUnitInfoRepo.getUnitInfo as any).mockImplementation(
        (unit: string) => {
          if (unit === "gram") return { unit: "gram", dimension: "mass" };
          if (unit === "pound") return { unit: "pound", dimension: "mass" };
          return undefined;
        }
      );

      (mockConversionConfigRepo.getConversionConfig as any).mockImplementation(
        (unit: string) => {
          if (unit === "gram") return { multiplier: 0.001, offset: 0 }
          if (unit === "pound") return { multiplier: 0.453592, offset: 0 }
          return undefined;
        }
      );
    });

    it("should return true for existing UnitInfo and ConversionConfig", () => {
      const fromUnit = "pound";
      const toUnit = "gram";
      const configuredUnits = unitValidationServiceImpl.unitsAreConfigured(fromUnit, toUnit);

      expect(configuredUnits).toBe(true);
      expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(2);
    })

    it("should return false for not existing UnitInfo or ConversionConfig", () => {
      const fromUnit = "pound";
      const toUnit = "hectogram";
      const configuredUnits = unitValidationServiceImpl.unitsAreConfigured(fromUnit, toUnit);

      expect(configuredUnits).toBe(false);
      expect(mockConversionConfigRepo.getConversionConfig).toHaveBeenCalledTimes(2);
      expect(mockUnitInfoRepo.getUnitInfo).toHaveBeenCalledTimes(2);
    })
  })
});
