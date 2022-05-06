import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async (createFeedbackSpy) => { } },
    { sendMail: async (sendMailSpy) => { } }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {


        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64/aksndjabsjdnsdsa',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64/aksndjabsjdnsdsa',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64/aksndjabsjdnsdsa',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with invalid extensions ', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });

});