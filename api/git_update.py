from git import Repo

# make sure .git folder is properly configured
PATH_OF_GIT_REPO = r'\Users\Kaldi\Documents\desoline\Devst-Project\devst-node-server\.git'
COMMIT_MESSAGE = 'comment from python script'


def git_push():
    try:
        repo = Repo(PATH_OF_GIT_REPO)
        repo.git.add(update=True)
        repo.index.commit(COMMIT_MESSAGE)
        origin = repo.remote(name='origin')
        origin.push()
    except:
        print('Some error occured while pushing the code')
    print("git update successfully!")


git_push()


# import os
# # gitlub update repository

# commit = "test git script"
# try:
#     os.system(r'git add .')
#     os.system(rf'git commit –m \"{commit}\"')
#     os.system(r'git push -uf origin main')
# except NameError:
#     print(NameError)

# print("git update successfully!")
