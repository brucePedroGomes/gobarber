import { createConnections } from 'typeorm';

createConnections().catch(error => console.log(error));
