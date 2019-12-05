import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { name, email, question, answer } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Novo registro',
      template: 'answer',
      context: {
        name,
        email,
        question,
        answer,
      },
    });
  }
}

export default new AnswerMail();
