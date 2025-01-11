const supabase = require('./supabase');

async function executeRawSQL(query) {
    const { data, error } = await supabase
      .rpc('execute_query', { query });
  
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
  
    console.log('Query Result:', data);
  }
  
  executeRawSQL('SELECT * FROM card LIMIT 100');