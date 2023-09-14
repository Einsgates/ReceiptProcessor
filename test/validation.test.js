import { expect } from 'chai';
import { validateData } from '../validation.js';
import testData from './testDataValidation.json' assert { type: "json" };

describe('Validation Module', function () {
  it('should validate data correctly', function () {
    const result = validateData(testData[0]);
    expect(result).to.equal("Everything is Valid");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[1]);
    expect(result).to.equal("Empty payload");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[2]);
    expect(result).to.equal("Blank Retailer");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[3]);
    expect(result).to.equal("Invalid Date");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[4]);
    expect(result).to.equal("Invalid Time");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[5]);
    expect(result).to.equal("Empty Items");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[6]);
    expect(result).to.equal("No short description");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[7]);
    expect(result).to.equal("Invalid item price");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[8]);
    expect(result).to.equal("Invalid total values");
  });
  it('should validate data correctly', function () {
    const result = validateData(testData[9]);
    expect(result).to.equal("Total not equal to sum of items value");
  });
});
