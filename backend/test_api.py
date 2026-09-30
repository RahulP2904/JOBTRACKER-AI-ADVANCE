import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:8000/api/v1"

def log(test_name, success, detail=""):
    status = "[PASS]" if success else "[FAIL]"
    print(f"{status} | {test_name} {f'- {detail}' if detail else ''}")

def test_health():
    try:
        req = urllib.request.Request("http://localhost:8000/health")
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            log("Health Check Endpoint", data.get("status") == "healthy", f"Database: {data.get('database_url')}")
    except Exception as e:
        log("Health Check Endpoint", False, str(e))

def test_auth_login():
    try:
        payload = json.dumps({"email": "rahul@jobflow.dev", "password": "password123"}).encode('utf-8')
        req = urllib.request.Request(f"{BASE_URL}/auth/login", data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            token = data.get("access_token")
            log("User Login Endpoint (rahul@jobflow.dev)", bool(token), f"Token generated ({len(token)} chars)")
            return token
    except Exception as e:
        log("User Login Endpoint", False, str(e))
        return None

def test_admin_login():
    try:
        payload = json.dumps({"email": "admin@jobflow.dev", "password": "adminpass123"}).encode('utf-8')
        req = urllib.request.Request(f"{BASE_URL}/auth/login", data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            token = data.get("access_token")
            role = data.get("user", {}).get("role")
            log("Admin Login Endpoint (admin@jobflow.dev)", bool(token and role == "admin"), f"Role: {role}")
            return token
    except Exception as e:
        log("Admin Login Endpoint", False, str(e))
        return None

def test_get_me(token):
    if not token:
        log("Get /auth/me", False, "Skipped - No Token")
        return
    try:
        req = urllib.request.Request(f"{BASE_URL}/auth/me", headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            log("Get Current User (/auth/me)", data.get("email") == "rahul@jobflow.dev", f"User: {data.get('full_name')}")
    except Exception as e:
        log("Get Current User (/auth/me)", False, str(e))

def test_applications(token):
    if not token:
        log("Get Applications List", False, "Skipped - No Token")
        return
    try:
        req = urllib.request.Request(f"{BASE_URL}/applications", headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            log("Get Applications List", isinstance(data, list), f"Found {len(data)} applications in DB")
    except Exception as e:
        log("Get Applications List", False, str(e))

def test_jobs(token):
    if not token:
        log("Get Jobs List", False, "Skipped - No Token")
        return
    try:
        req = urllib.request.Request(f"{BASE_URL}/jobs", headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            log("Get Jobs List", isinstance(data, list), f"Found {len(data)} jobs in DB")
    except Exception as e:
        log("Get Jobs List", False, str(e))

def test_goals(token):
    if not token:
        log("Get Goals List", False, "Skipped - No Token")
        return
    try:
        req = urllib.request.Request(f"{BASE_URL}/goals", headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            log("Get Goals List", isinstance(data, list), f"Found {len(data)} goals in DB")
    except Exception as e:
        log("Get Goals List", False, str(e))

def test_admin_users(admin_token):
    if not admin_token:
        log("Admin RBAC Users List (/auth/users)", False, "Skipped - No Admin Token")
        return
    try:
        req = urllib.request.Request(f"{BASE_URL}/auth/users", headers={"Authorization": f"Bearer {admin_token}"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            log("Admin RBAC Users List (/auth/users)", isinstance(data, list), f"Total Users in DB: {len(data)}")
    except Exception as e:
        log("Admin RBAC Users List (/auth/users)", False, str(e))

if __name__ == "__main__":
    print("==================================================")
    print("RUNNING BACKEND API TEST SUITE")
    print("==================================================")
    test_health()
    user_token = test_auth_login()
    admin_token = test_admin_login()
    test_get_me(user_token)
    test_applications(user_token)
    test_jobs(user_token)
    test_goals(user_token)
    test_admin_users(admin_token)
    print("==================================================")
