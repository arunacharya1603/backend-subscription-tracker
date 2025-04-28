import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions, getAllSubscriptions, getSubscriptionById } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionById);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.send({ message: `UPDATE subscription with id ` });
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.send({ message: `DELETE subscription with id ` });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send({ message: `CANCEL subscription with id ` });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({ message: `RENEW subscription with id ` });
});

export default subscriptionRouter;

