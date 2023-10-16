import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';

import * as notes from '../models/notes';

export const getSingle = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const noteId = event.pathParameters!.id!;
  const user = event.headers['x-api-key']!;

  return {
    statusCode: 200,
    body: JSON.stringify(await notes.getById(user, +noteId)),
  };
};

export const getAll = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const user = event.headers['x-api-key']!;

  const listOfNotes = await notes.getAll(user);

  return {
    statusCode: 200,
    body: JSON.stringify(listOfNotes),
  };
};

export const create = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResultV2> => {
  const payload = JSON.parse(event.body ?? '') as Note;
  const user = event.headers['x-api-key']!;

  const note = await notes.upsert(user, payload);

  return {
    statusCode: 201,
    body: JSON.stringify(note),
  };
};

interface Note {
  id: number;
  text: string;
}