/* eslint-disable func-names, no-unused-expressions */
const { expect } = require('chai');

const { splitReference } = require('../lib/utils');

describe('utils', () => {
  describe('splitReference', () => {
    const baseUrl = 'https://www.example.com/fhir';
    const id = '1234';

    context('with an absolute reference', () => {
      context('with an STU3 reference', () => {
        it('returns the baseUrl, resource type, and id', () => {
          const resourceType = 'MedicationRequest';
          const absoluteReference = `${baseUrl}/${resourceType}/${id}`;
          expect(splitReference(absoluteReference).baseUrl).to.equal(baseUrl);
          expect(splitReference(absoluteReference).resourceType).to.equal(resourceType);
          expect(splitReference(absoluteReference).id).to.equal(id);
        });
      });

      context('with a DSTU2 reference', () => {
        it('returns the baseUrl, resource type, and id', () => {
          const resourceType = 'MedicationOrder';
          const absoluteReference = `${baseUrl}/${resourceType}/${id}`;
          expect(splitReference(absoluteReference).baseUrl).to.equal(baseUrl);
          expect(splitReference(absoluteReference).resourceType).to.equal(resourceType);
          expect(splitReference(absoluteReference).id).to.equal(id);
        });
      });
    });

    context('with a relative reference', () => {
      it('returns the resource type and id', () => {
        const resourceType = 'Patient';
        const relativeReference = `${resourceType}/${id}`;
        expect(splitReference(relativeReference).baseUrl).to.be.undefined;
        expect(splitReference(relativeReference).resourceType).to.equal(resourceType);
        expect(splitReference(relativeReference).id).to.equal(id);
      });
    });

    context('with an invalid reference', () => {
      it('throws an error', () => {
        const resourceType = 'Patent'; // intentional misspelling so reference is invalid
        const absoluteReference = `${baseUrl}/${resourceType}/${id}`;
        const expectedError = `${absoluteReference} is not a recognized FHIR reference`;
        expect(() => splitReference(absoluteReference)).to.throw(expectedError);
      });
    });
  });
});