"""empty message

Revision ID: f22300f62548
Revises: 
Create Date: 2024-01-17 17:53:26.081214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f22300f62548'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('consoles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=180), nullable=False),
    sa.Column('company', sa.String(length=180), nullable=False),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=180), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
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
    op.drop_table('user')
    op.drop_table('genres')
    op.drop_table('consoles')
    # ### end Alembic commands ###
