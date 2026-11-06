# base/apps.py
import os

from django.apps import AppConfig
from django.db.models.signals import post_migrate

# Permanent admin account, recreated on every `migrate` (i.e. whenever a new database is set up).
# Override the password in production with DEFAULT_SUPERUSER_PASSWORD in .env.
DEFAULT_SUPERUSER_EMAIL = os.environ.get("DEFAULT_SUPERUSER_EMAIL", "admin@gmail.com")
DEFAULT_SUPERUSER_PASSWORD = os.environ.get("DEFAULT_SUPERUSER_PASSWORD", "123456")


def ensure_default_superuser(sender, using="default", **kwargs):
    """Create the permanent superuser if missing and keep it an active superuser."""
    from django.contrib.auth import get_user_model

    User = get_user_model()
    user = User.objects.using(using).filter(email__iexact=DEFAULT_SUPERUSER_EMAIL).first()
    if user is None:
        User.objects.db_manager(using).create_superuser(
            DEFAULT_SUPERUSER_EMAIL, DEFAULT_SUPERUSER_PASSWORD,
            first_name="Admin", is_verified=True,
        )
        return
    if not (user.is_superuser and user.is_staff and user.is_active):
        user.is_superuser = user.is_staff = user.is_active = True
        user.save(using=using, update_fields=["is_superuser", "is_staff", "is_active"])


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        import base.signals
        from base.search import connect_signals

        connect_signals()
        post_migrate.connect(ensure_default_superuser, sender=self, dispatch_uid="base-default-superuser")
