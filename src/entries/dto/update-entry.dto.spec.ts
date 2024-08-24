import { plainToInstance } from 'class-transformer';
import { UpdateEntryDto } from './update-entry.dto';
import { updateEntry, updateEntryBad } from '../../../test/mocks/entry.data';
import { validate } from 'class-validator';

describe('updateEntryDto', () => {
  it('should pass with good data', async () => {
    const goodDto = plainToInstance(UpdateEntryDto, updateEntry);
    const errors = await validate(goodDto);
    expect(errors.length).toBe(0);
  });

  it('should fail with bad data - categoryId as string', async () => {
    const badDto = plainToInstance(UpdateEntryDto, updateEntryBad);
    const errors = await validate(badDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'categoryId must be an integer number',
    );
  });
});
