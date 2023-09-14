import { expect } from 'chai';
import { calculatePoints } from '../points.js';
import testData from './testDataPoints.json' assert {type: "json"};

describe('Points Module', function () {
  it('should calculate points correctly', function () {
    const result = calculatePoints(testData[0]);
    expect(result).to.equal(28);
  });
  it('should calculate points correctly', function () {
    const result = calculatePoints(testData[1]);
    expect(result).to.equal(109);
  });
  it('should calculate points correctly', function () {
    const result = calculatePoints(testData[2]);
    expect(result).to.equal(103);
  });
  it('should calculate points correctly', function () {
    const result = calculatePoints(testData[3]);
    expect(result).to.equal(117);
  });
});
