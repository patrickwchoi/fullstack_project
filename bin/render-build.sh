set -o errexit
npm run build
bundle install
rails db:seed db:migrate 