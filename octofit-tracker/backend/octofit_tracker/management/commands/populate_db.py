from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Deleting old data...')
        from django.db import connection
        db = connection.cursor().db_conn.client['octofit_db']
        db.activities.delete_many({})
        db.leaderboards.delete_many({})
        db.workouts.delete_many({})
        db.users.delete_many({})
        db.teams.delete_many({})

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        self.stdout.write('Creating users...')
        users = [
            User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel),
            User.objects.create(email='captain@marvel.com', name='Captain America', team=marvel),
            User.objects.create(email='batman@dc.com', name='Batman', team=dc),
            User.objects.create(email='superman@dc.com', name='Superman', team=dc),
        ]

        self.stdout.write('Creating workouts...')
        workouts = [
            Workout.objects.create(name='Super Strength', description='Strength workout', suggested_for='DC'),
            Workout.objects.create(name='Flight Training', description='Flight skills', suggested_for='Marvel'),
        ]

        self.stdout.write('Creating activities...')
        Activity.objects.create(user=users[0], type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='Swimming', duration=60, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Flying', duration=120, date=timezone.now().date())

        self.stdout.write('Creating leaderboards...')
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
