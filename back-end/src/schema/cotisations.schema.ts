import mongoose from 'mongoose'
const { Schema } = mongoose

interface Cotisation extends Document {
  _id: string
  libelle: string
  type: string
  employeur: number
  salarie: number
  modeDePayement: string
}

const cotisationsSchema = new Schema<Cotisation>({
  libelle: String,
  type: { type: String, unique: true, message: 'Type must be unique' },
  employeur: Number,
  salarie: Number,
  modeDePayement: String,
})
/**
 * To prevent receiving an empty array in production:
 * const Cotisations = mongoose.model<Cotisation>('Cotisations', cotisationsSchema, 'Cotisations')
 * use the lowercase collection name "cotisations" instead of "Cotisations".
 * Otherwise, you may receive an empty array in the response even if your collection contains data.
 * For more details, see https://mongoosejs.com/docs/models.html
 * The first argument is the singular name of the collection your model is for.
 * Mongoose automatically looks for the plural, lowercased version of your model name.
 * Thus, for the example below, the model Cotisation is for the tanks collection in the database.
 */
const Cotisations = mongoose.model<Cotisation>('cotisation', cotisationsSchema, 'cotisations')

export default Cotisations
