interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'team@gobarber.com',
      name: 'Team Gobarber',
    },
  },
} as IMailConfig;

// email/user name configured in
