import GradingCompany, { type GradingCompanyJson} from './grading-company';
import Joi from 'joi';

// Object instantiation tests.
test('grading company instantiation without id', () => {
    expect(() => new GradingCompany({name: 'test'})).toThrow(ReferenceError);
});
test('grading company instantiation without name', () => {
    expect(() => new GradingCompany({id: 1})).toThrow(ReferenceError);
});
test('grading company instantiation with id, name', () => {
    const gradingCompany = new GradingCompany({
        id: 1,
        name: 'test',
    });
    expect(gradingCompany instanceof GradingCompany).toBe(true);
});
test('grading company instantiation with id, name, and opened date', () => {
    const gradingCompany = new GradingCompany({
        id: 1,
        name: 'test',
        dateOpened: new Date(),
    });
    expect(gradingCompany instanceof GradingCompany).toBe(true);
});
test('grading company instantiation with id, name, opened date, and closed date', () => {
    const gradingCompany = new GradingCompany({
        id: 1,
        name: 'test',
        dateOpened: new Date(),
        dateClosed: new Date(),
    });
    expect(gradingCompany instanceof GradingCompany).toBe(true);
});

// Tests invalid Grading Companies.
test.each([
    // Invalid ID.
    [{ id: -1, name: 'Test', }],
    // Invalid name too short.
    [{ id: 1,  name: '', }],
    // Invalid name too long (256 Characters).
    [{ id: 1,  name: new Array(257).join('a') }],
    // Invalid id and name too short.
    [{ id: -1,  name: '' }],
    // Invalid id and name too long (256 Characters).
    [{ id: -1,  name: new Array(257).join('a') }],
])('%p is an invalid grading componay', async (gradingCompanyJson: GradingCompanyJson) => {
    const gradingCompany = new GradingCompany(gradingCompanyJson);
    await expect(async () => {
        await gradingCompany.validate()
    }).rejects.toThrow(Joi.ValidationError);
});

// Tests Valid Grading Companies
test.each([
    // Valid ID and Name.
    [{ id: 1, name: 'Test' }],
    // Valid ID, Name, and Date Opened.
    [{ id: 1, name: 'Test', dateOpened: new Date() }],
    // Valid ID, Name, and Date Opened that is null.
    [{ id: 1, name: 'Test', dateOpened: null }],
    // Valid ID, Name, and Date Closed.
    [{ id: 1, name: 'Test', dateClosed: new Date() }],
    // Valid ID, Name, and Date Closed that is null.
    [{ id: 1, name: 'Test', dateClosed: null }],
    // Valid ID, Name, Date Opened, and Date Closed.
    [{ id: 1, name: 'Test', dateOpened: new Date(), dateClosed: new Date() }],
    // Valid ID, Name, Date Opened is null, and Date Closed is null.
    [{ id: 1, name: 'Test', dateOpened: null, dateClosed: null }],
])('%p is a valid grading componay', async (gradingCompanyJson: GradingCompanyJson) => {
    expect(await new GradingCompany(gradingCompanyJson).validate()).toBe(true);
});