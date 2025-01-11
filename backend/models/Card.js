const supabase = require('../supabase');

class Card {
  static async create(data) {
    const { data: card, error } = await supabase.from('card').insert(data).select();
    if (error) throw new Error(error.message);
    return card;
  }

  static async getAll() {
    const { data: cards, error } = await supabase.from('card').select('*');
    if (error) throw new Error(error.message);
    return cards;
  }

  static async getById(id) {
    const { data: card, error } = await supabase.from('card').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return card;
  }

  static async Func() {
    supabase.sql('SELECT * FROM ')
    const { data: card, error } = await supabase.from('card').select('*').eq('id', 50).single();
    if (error) throw new Error(error.message);
    return card;
  }

  static async update(id, updates) {
    const { data: card, error } = await supabase.from('card').update(updates).eq('id', id).select();
    if (error) throw new Error(error.message);
    return card;
  }

  static async delete(id) {
    const { error } = await supabase.from('card').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Card deleted successfully' };
  }
}

module.exports = Card;
