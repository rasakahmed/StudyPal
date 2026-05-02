const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash('Password123!', 12);
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      name: 'Demo Student',
      email: 'demo@studypal.test',
      password,
      preferences: JSON.stringify({ theme: 'light' }),
      createdAt: now,
      updatedAt: now
    }]);
    await queryInterface.bulkInsert('Tasks', [
      { userId: 1, title: 'Finish database lab report', description: 'Normalize schema and prepare ERD', dueDate: now, priority: 'high', completed: false, category: 'Assignments', createdAt: now, updatedAt: now },
      { userId: 1, title: 'Review calculus notes', description: 'Limits and differentiation', dueDate: now, priority: 'medium', completed: true, category: 'Study', createdAt: now, updatedAt: now }
    ]);
    await queryInterface.bulkInsert('Notes', [{
      userId: 1,
      title: 'Software Engineering Review',
      content: '<p>Agile iterations, requirement analysis, testing pyramid, CI/CD, and maintainable architecture.</p>',
      tags: JSON.stringify(['software-engineering', 'exam']),
      createdAt: now,
      updatedAt: now
    }]);
    await queryInterface.bulkInsert('Events', [
      { userId: 1, title: 'Midterm Exam', description: 'Room 302', date: now, category: 'deadline', createdAt: now, updatedAt: now },
      { userId: 1, title: 'Group Study', description: 'Library', date: now, category: 'study', createdAt: now, updatedAt: now }
    ]);
    await queryInterface.bulkInsert('Expenses', [
      { userId: 1, amount: 18.5, category: 'Food', date: now.toISOString().slice(0, 10), createdAt: now, updatedAt: now },
      { userId: 1, amount: 42.0, category: 'Books', date: now.toISOString().slice(0, 10), createdAt: now, updatedAt: now }
    ]);
    await queryInterface.bulkInsert('Habits', [{
      userId: 1,
      waterIntake: 7,
      sleepHours: 7.5,
      studyHours: 3.5,
      workout: true,
      streak: 1,
      date: now.toISOString().slice(0, 10),
      createdAt: now,
      updatedAt: now
    }]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Habits', { userId: 1 });
    await queryInterface.bulkDelete('Expenses', { userId: 1 });
    await queryInterface.bulkDelete('Events', { userId: 1 });
    await queryInterface.bulkDelete('Notes', { userId: 1 });
    await queryInterface.bulkDelete('Tasks', { userId: 1 });
    await queryInterface.bulkDelete('Users', { id: 1 });
  }
};
