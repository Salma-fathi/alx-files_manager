/**
 * @fileoverview Test suite for DBClient utility
 * @requires utils/db
 * @module tests/utils/db.test
 *
 * @description Tests the functionality of the DBClient utility class.
 * Tests include:
 * - Database connection status
 * - User count retrieval
 * - File count retrieval
 *
 * @beforeAll Cleans up the database by removing all users and files
 * @timeout 10000ms for the cleanup operation
 *
 * @tests
 * - Verifies if database client is connected
 * - Confirms zero users after cleanup
 * - Confirms zero files after cleanup
 */
/* eslint-disable import/no-named-as-default */
import dbClient from '../../utils/db';

describe('+ DBClient utility', () => {
  before(function (done) {
    this.timeout(10000);
    Promise.all([dbClient.usersCollection(), dbClient.filesCollection()])
      .then(([usersCollection, filesCollection]) => {
        Promise.all([usersCollection.deleteMany({}), filesCollection.deleteMany({})])
          .then(() => done())
          .catch((deleteErr) => done(deleteErr));
      }).catch((connectErr) => done(connectErr));
  });

  it('+ Client is alive', () => {
    expect(dbClient.isAlive()).to.equal(true);
  });

  it('+ nbUsers returns the correct value', async () => {
    expect(await dbClient.nbUsers()).to.equal(0);
  });

  it('+ nbFiles returns the correct value', async () => {
    expect(await dbClient.nbFiles()).to.equal(0);
  });
});
