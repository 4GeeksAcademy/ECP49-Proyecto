"""empty message

Revision ID: 4214bb91dea2
Revises: d070df6a37b5
Create Date: 2024-01-13 16:50:36.611263

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4214bb91dea2'
down_revision = 'd070df6a37b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('videogame',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=180), nullable=False),
    sa.Column('pegi', sa.Integer(), nullable=True),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('videogame')
    # ### end Alembic commands ###
