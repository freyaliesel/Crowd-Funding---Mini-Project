const router = require('express').Router();
const { Project, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbProjectData = await Project.findAll();
    // console.log(dbProjectData);
    const projects = dbProjectData.map((project) =>
      project.get({ plain: true })
    );
    console.log(projects);
    res.render('homepage', { projects });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const dbProjectData = await Project.findByPk(req.params.id);
    if (!dbProjectData) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }
    // for single item, not array
    const projects = dbProjectData.get({ plain: true });

    // before passing to render, adjust the properties being sent
    res.render('project', projects);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id);
    if (!dbUserData) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }
    // for single item, not array
    const projects = dbProjectData.get({ plain: true });

    // before passing to render, adjust the properties being sent
    res.render('project', projects);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
