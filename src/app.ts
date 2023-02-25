import buildServer from './server';

const server = buildServer();

async function main() {
  try {
    await server.listen(3000, '0.0.0.0');
    console.log(`Server listening on http://localhost:3000`);
  } catch (error) {
    console.error(`Error starting server: ${error}`);
    process.exit(1);
  }
}

main();
