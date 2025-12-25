from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team', description='desc')
        self.assertEqual(str(team), 'Test Team')
    def test_user_creation(self):
        team = Team.objects.create(name='T', description='d')
        user = User.objects.create(email='a@b.com', name='A', team=team)
        self.assertEqual(str(user), 'a@b.com')
