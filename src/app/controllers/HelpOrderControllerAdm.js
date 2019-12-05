import HelpOrderSchema from '../schemas/HelpOrder';
import * as Yup from 'yup';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpOrderAdm {
  async index(req, res) {
    const helpOrdes = await HelpOrderSchema.find();
    return res.json(helpOrdes);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { answer } = req.body;
    const helperOrder = await HelpOrderSchema.findByIdAndUpdate(
      req.params.id,
      { read: true, answer },
      { new: true }
    );

    const { question, student_id } = helperOrder;

    const { name, email } = await Student.findByPk(student_id);
    await Queue.add(AnswerMail.key, {
      name,
      email,
      question,
      answer,
    });

    return res.json(helperOrder);
  }
}

export default new HelpOrderAdm();
