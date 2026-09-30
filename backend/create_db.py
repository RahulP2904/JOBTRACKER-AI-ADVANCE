import asyncio
import asyncpg

async def main():
    try:
        conn = await asyncpg.connect("postgresql://postgres:159951@localhost:5432/postgres")
        db_exists = await conn.fetchval("SELECT 1 FROM pg_database WHERE datname='jobflow'")
        if not db_exists:
            await conn.execute('CREATE DATABASE jobflow;')
            print("[SUCCESS] PostgreSQL database 'jobflow' created successfully!")
        else:
            print("[INFO] PostgreSQL database 'jobflow' already exists.")
        await conn.close()
    except Exception as e:
        print(f"Error creating database: {e}")

if __name__ == "__main__":
    asyncio.run(main())
