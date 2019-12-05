import HelpOrderSchema from '../schemas/HelpOrder';
import * as Yup from 'yup';

class HelpOrder {
  async find(req, res) {
    const { id: student_id } = req.params;
    const helpOrder = await HelpOrderSchema.find({
      student_id,
    });
    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id, question } = req.body;

    const helpOrder = await HelpOrderSchema.create({
      student_id,
      question,
      answer: null,
    });
    return res.json(helpOrder);
  }
}

export default new HelpOrder();
