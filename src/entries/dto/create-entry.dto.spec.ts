import { plainToInstance } from 'class-transformer';
import { CreateEntryDto } from './create-entry.dto';
import { createEntryBad, newEntry } from '../../../test/mocks/entry.data';
import { validate } from 'class-validator';

describe('createEntryDto', () => {
  it('should pass with good data', async () => {
    const goodDto = plainToInstance(CreateEntryDto, newEntry);
    const errors = await validate(goodDto);
    expect(errors.length).toBe(0);
  });

  it('should fail with bad data - missing firstName', async () => {
    const badDto = plainToInstance(CreateEntryDto, createEntryBad);
    const errors = await validate(badDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('firstName must be a string');
  });
});
